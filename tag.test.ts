import {expect, test} from 'vitest';
import {Tag} from "./tag";

test("paired without attrs without content", () => {
    expect(new Tag("button").toString()).toBe("<button></button>")
})

test("paired without attrs with content", () => {
    expect(new Tag("button", {}, "the button").toString()).toBe("<button>the button</button>")
})

test("paired with attrs without content", () => {
    expect(new Tag("button", {class: "classique"}).toString()).toBe('<button class="classique"></button>')
})

test("paired with attrs with content", () => {
    expect(new Tag("button", {class: "classique"}, "the button").toString()).toBe('<button class="classique">the button</button>')
})

test("unpaired without attrs", () => {
    expect(new Tag("input").toString()).toBe('<input>')
})
test("unpaired with attrs", () => {
    expect(new Tag("input", {class: "classique"}).toString()).toBe('<input class="classique">')
})