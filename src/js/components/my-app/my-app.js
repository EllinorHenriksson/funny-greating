/**
 * The my-app web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

// Get URL to images.
/*
const URLS = []

for (let i = 0; i <= 3; i++) {
  URLS.push(new URL(`./images/${i}.png`, import.meta.url))
}
*/

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-app {
    padding: 20px;
  }

  label {
    width: 1px;
    height: 1px;
    position: absolute;
    top: -1000px;
    left: -1000px;
  }
</style>

<div id="my-app">
  <h1>Laboration 0</h1>
  <p>Submit your name and get a personal greeting!</p>
  <form>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Name" autofocus required />
    <input type="submit" value="Submit" />
  </form>
  
  <div id="name-container"></div>
</div>
`

customElements.define('my-app',
  /**
   * Represents a my-app element.
   */
  class extends HTMLElement {
    /**
     * The #my-app div element.
     *
     * @type {HTMLDivElement}
     */
    #myApp
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and append the template to the shadow root.
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      // Create a reference to the #desktop div element.
      this.#myApp = this.shadowRoot.querySelector('#my-app')

      // Add event listeners.
      this.shadowRoot.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()
        this.#handleSubmit(event)
      })
    }

    /**
     * Handles submit events.
     *
     * @param {SubmitEvent} event - The dispatched event.
     */
    #handleSubmit (event) {
      const name = this.shadowRoot.querySelector('input[type="text"]').value
      this.shadowRoot.querySelector('#name-container').innerText = `Welcome ${name}!`
    }
  }
)
