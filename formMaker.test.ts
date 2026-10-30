import {expect, test} from 'vitest';
import HexletCode from "./formMaker";


const template = { name: 'bob', job: 'hexlet', gender: 'm' };

test("form", () => {
    expect(HexletCode.formFor(template, {}, (f) => {})).toBe('<form action="#" method="post"></form>');
})

test("form with url", () => {
    expect(HexletCode.formFor(template, {url: '/users'}, (f) => {})).toBe('<form action="/users" method="post"></form>');
})

test("form with inputs", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name");
        f.input("job")
    }))
        .toBe('<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value="bob"><label for="job">Job</label><input name="job" type="text" value="hexlet"></form>');
})

test("form with classed inputs", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name", {class: 'user-input'});
        f.input("job")
    }))
        .toBe('<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" class="user-input" value="bob"><label for="job">Job</label><input name="job" type="text" value="hexlet"></form>');
})

test("form with textarea", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name", {as: 'textarea'})
    }))
        .toBe('<form action="#" method="post"><label for="name">Name</label><textarea name="name" cols="20" rows="40">bob</textarea></form>');
})

test("form with sized textarea", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name", {as: 'textarea', cols: 50, rows: 50})
    }))
        .toBe('<form action="#" method="post"><label for="name">Name</label><textarea name="name" cols="50" rows="50">bob</textarea></form>');
})




test("form with sized textarea with button", () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
        f.input('name');
        f.input('job', {as: 'textarea'});
        f.submit();
    });
    expect(form).toBe('<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value="bob"><label for="job">Job</label><textarea name="job" cols="20" rows="40">hexlet</textarea><input type="submit" value="Save"></form>');
})

