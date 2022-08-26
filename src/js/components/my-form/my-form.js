/**
 * The my-form web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  label {
    width: 1px;
    height: 1px;
    position: absolute;
    top: -1000px;
    left: -1000px;
  }
</style>

<div id="my-form">
  <p>Submit your name and get a personal greeting!</p>
  <form>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Name" required />
    <input type="submit" value="Submit" />
  </form>
</div>
`

customElements.define('my-form',
  /**
   * Represents a my-form element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and append the template to the shadow root.
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      // Add event listeners.
      this.shadowRoot.querySelector('form').addEventListener('submit', event => {
        this.#handleSubmit(event)
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['class']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {string} oldValue - The old attribute value.
     * @param {string} newValue - The new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'class' && !newValue.includes('hidden')) {
        this.shadowRoot.querySelector('input[type="text"]').value = ''
        this.shadowRoot.querySelector('input[type="text"]').focus()
      }
    }

    /**
     * Handles submit events.
     *
     * @param {SubmitEvent} event - The dispatched event.
     */
    async #handleSubmit (event) {
      event.preventDefault()
      event.stopPropagation()

      // Dispatches a custom event
      this.dispatchEvent(new window.CustomEvent('submit', { detail: { name: this.shadowRoot.querySelector('input[type="text"]').value }, bubbles: true }))
    }
  }
)
