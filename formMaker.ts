import {Tag} from "./tag";

type BasicInputOptions = {
    class?: string,
    as?: 'textarea',
}
type TextareaInputOptions = {
    class?: string,
    as: 'textarea',
    cols?: number,
    rows?: number
}
type FormInputOptions = BasicInputOptions | TextareaInputOptions


export default class FormMaker {
    private fieldTags: Tag[]

    constructor(private fields: Record<string, string | number>) {
        this.fieldTags = [];
    }

    input(fieldName: string, opts: FormInputOptions = {}) {
        let tagName = 'input';
        let tagAttrs = {name: fieldName};
        let content = '';
        if (opts.as) {
            const {as, ...rest} = opts;
            tagAttrs = {...tagAttrs, cols: 20, rows: 40, ...rest};
            if (as == 'textarea') {
                tagName = 'textarea';
            }
        } else {
            tagAttrs = {...tagAttrs, type: 'text', ...opts};
        }
        const fieldValue = this.fields[fieldName];
        if (fieldValue === undefined || fieldValue === null) {
            throw new Error(`No such field: ${fieldName}`);
        }
        if (tagName === 'input') {
            tagAttrs.value = this.fields[fieldName];
        } else if (tagName === 'textarea') {
            content = this.fields[fieldName].toString();
        }
        const prettyName = fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1)
        this.fieldTags.push(new Tag('label', {for: fieldName}, prettyName));
        this.fieldTags.push(new Tag(tagName, tagAttrs, content));
    }

    submit(saveText: string = 'Save') {
        this.fieldTags.push(new Tag('input', {type: 'submit', value: saveText}));
    }

    static formFor(obj: Record<string, string | number>, opts: { url?: string },
                   fields: (a: FormMaker) => void): string {
        let attrs = {action: '#', method: 'post'};
        if (opts.url) {
            attrs.action = opts.url;
        }
        const maker = new FormMaker(obj);
        fields(maker);
        const innerHtml = maker.fieldTags.map(tag => tag.toString()).join('');
        return new Tag("form", attrs, innerHtml).toString();
    }
}