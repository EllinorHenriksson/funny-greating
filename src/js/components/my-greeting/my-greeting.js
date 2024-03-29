/**
 * The my-greeting web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #name-container {
    margin: 10px auto;
  }

  #joke-container {
    margin: 10px auto;
    max-width: 500px;
    min-width: 300px;
    padding: 10px;
    font-style: italic;
    font-size: 1.2rem;
  }

  button {
    padding: 5px;
    border: 2px solid #32a852;
    border-radius: 10px;
    color: #ffffff;
    background-color: #32a852;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
  }

  button:hover {
    color: #32a852;
    background-color: #ffffff;
  }
</style>

<div id="my-greeting" class="hidden">
  <div id="name-container"></div>
  <div id="joke-container"></div>
  <button id="return">Return</button>
</div>
`

customElements.define('my-greeting',
  /**
   * Represents a my-greeting element.
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
      this.shadowRoot.querySelector('button').addEventListener('click', event => {
        this.#handleClick(event)
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['name', 'joke']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {string} oldValue - The old attribute value.
     * @param {string} newValue - The new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'name') {
        this.shadowRoot.querySelector('#name-container').innerText = `Hi ${newValue}! 👋`
      }

      if (name === 'joke') {
        this.shadowRoot.querySelector('#joke-container').innerText = `"${newValue}"`
      }
    }

    /**
     * Handles click events.
     *
     * @param {MouseEvent} event - The dispatched event.
     */
    async #handleClick (event) {
      event.stopPropagation()

      // Dispatches a custom event
      this.dispatchEvent(new window.CustomEvent('return', { bubbles: true }))
    }
  }
)
