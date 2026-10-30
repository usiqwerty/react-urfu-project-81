const UNPAIRED_TAGS = ["img", "br", "input", "meta", "hr"];

export class Tag {
    public name: string;
    public attrs: { [k: string]: string };
    public content: string

    constructor(name: string, attrs?: { [k: string]: string }, content?: string) {
        this.name = name;
        this.attrs = attrs || {};
        this.content = content || "";
    }

    toString(): string {
        let html = "";
        const isPaired = !UNPAIRED_TAGS.includes(this.name);
        html += `<${this.name}`;
        for (const [attrName, attrVal] of Object.entries(this.attrs)) {
            html += ` ${attrName}="${attrVal}"`;
        }
        html += ">"
        html += this.content;
        if (isPaired) {
            html += `</${this.name}>`;
        }
        return html;
    }
}


console.log(new Tag("br").toString());
// <br>

console.log(new Tag("img", { src: "path/to/image" }).toString());
// <img src="path/to/image">

console.log(new Tag("input", { type: "submit", value: "Save" }).toString());
// <input type="submit" value="Save">

// Для парных тегов надо придумать как лучше
console.log(new Tag("label", {}, "Email").toString());
// <label>Email</label>

console.log(new Tag("label", { for: "email" }, "Email").toString());
// <label for="email">Email</label>

console.log(new Tag("div").toString());
// <div></div>