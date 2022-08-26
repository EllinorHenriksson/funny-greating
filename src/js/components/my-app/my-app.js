/**
 * The my-app web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import '../my-form'
import '../my-greeting'

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
    text-align: center;
  }

  .hidden {
    display: none;
  }

  h1 {
    color: #32a852;
  }
</style>

<div id="my-app">
  <h1>Name app</h1>
  <my-form></my-form>
  <my-greeting class="hidden"></my-greeting>
</div>
`

customElements.define('my-app',
  /**
   * Represents a my-app element.
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
      this.shadowRoot.querySelector('my-form').addEventListener('submit', event => {
        this.#handleSubmit(event)
      })

      this.shadowRoot.querySelector('my-greeting').addEventListener('return', event => {
        this.#handleReturn(event)
      })
    }

    /**
     * Handles custom submit events from the my-form component.
     *
     * @param {CustomEvent} event - The dispatched event.
     */
    async #handleSubmit (event) {
      event.stopPropagation()

      // Fetch joke from API.
      let joke

      try {
        const resp = await fetch(`https://api.humorapi.com/jokes/random?include-tags=nerdy&api-key=${import.meta.env.VITE_API_KEY}`)

        if (resp.ok) {
          const data = await resp.json()
          joke = data.joke
        } else {
          throw new Error()
        }
      } catch (error) {
        joke = 'There are only 10 kinds of people in this world: those who know binary and those who don\'t.'
      }

      // Set attribute name and joke on my-greeting.
      this.shadowRoot.querySelector('my-greeting').setAttribute('name', event.detail.name)
      this.shadowRoot.querySelector('my-greeting').setAttribute('joke', joke)

      // Change view.
      this.#toggleHidden()
    }

    /**
     * Handles custom return events from the my-greeting component.
     *
     * @param {CustomEvent} event - The dispatched event.
     */
    async #handleReturn (event) {
      this.#toggleHidden()
    }

    /**
     * Hides/shows the form and the greeting.
     */
    #toggleHidden () {
      this.shadowRoot.querySelector('my-form').classList.toggle('hidden')
      this.shadowRoot.querySelector('my-greeting').classList.toggle('hidden')
    }
  }
)
