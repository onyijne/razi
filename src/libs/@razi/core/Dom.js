/* eslint-disable no-undef */
import Component from './Component'

export default class RazDom extends Component {
  /** accepts only  */
  constructor (param) {
    super(param)
    this.html = param.html || ''
    this.razi = window.Razi
  }

  /**
   *
   * @param {Component} component The name of the element to create, will be prefixed with fml-
   */
  async createElement (component) {
    const domFragment = await textToDomFragment(component.html, component.id)
    customElements.define(
      `raz-${component.name.toLowerCase()}`,
      class extends HTMLElement {
        constructor () {
          super()
          const template = domFragment.content.cloneNode(true)
          this.attachShadow({ mode: 'open' }).appendChild(
            template
          )
        }
      }
    )
  }

  async mount (domFragment, baseId = '') {
    const clonedTemplate = domFragment.content.cloneNode(true)
    const id = baseId || this.razi.id
    this.render(clonedTemplate, {
      id,
      isBase: true
    })
    return this
  }

  /**
   * imported html code is a text, so we need to convert
   * it to a domcoment fragment
   */
  async makeDomReady () {
    const domFragment = await textToDomFragment(
      this.html,
      this.id
    )
    // this.html = '' // to free memorysince the raw html will not be refrenced again
    return domFragment
  }

  nodeById (id) {
    return document.getElementById(`${id}`)
  }

  async setMeta (head, payload) {
    const meta = document.createElement('meta')
    meta.setAttribute('name', payload.name)
    meta.setAttribute('content', payload.content)
    head.insertBefore(meta, head.querySelector('link'))
  }
}

/**
 * Converts raw text of html gotten from importing the html file to a document fragment
 * @param {string} rawText
 * @param {string} templateId
 */
export async function textToDomFragment (rawText, templateId) {
  const razDiv = document.createElement('raz-div')
  razDiv.innerHTML = rawText
  return razDiv.querySelector(`#${templateId}`)
}
