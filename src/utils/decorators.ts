/**
 * Our own custom customElement annotation to be lenient on
 * the same class being imported multiple times (probably through dynamic loading)
 * @param tag the HTML tag
 *
 */
export function customElement(tag: string) {
    return function (constructor: any): any {
        if (!customElements.get(tag)) {
            customElements.define(tag, constructor);
        } else {
            console.warn(`the custom element ${tag} can't be declared more than once`);
        }
        return constructor;
    };
}
