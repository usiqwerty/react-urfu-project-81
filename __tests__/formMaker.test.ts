import {expect, test} from 'vitest';
import HexletCode from "@hexlet/code";


const template = { name: 'bob', job: 'hexlet', gender: 'm' };

test("form", () => {
    expect(HexletCode.formFor(template, {}, (f) => {})).toBe('<form method="post" action="#"></form>');
})

test("form with url", () => {
    expect(HexletCode.formFor(template, {url: '/users'}, (f) => {})).toBe('<form method="post" action="/users"></form>');
})

test("form with inputs", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name");
        f.input("job")
    }))
        .toBe('<form method="post" action="#"><label for="name">Name</label><input name="name" type="text" value="bob"><label for="job">Job</label><input name="job" type="text" value="hexlet"></form>');
})

test("form with classed inputs", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name", {class: 'user-input'});
        f.input("job")
    }))
        .toBe('<form method="post" action="#"><label for="name">Name</label><input name="name" type="text" class="user-input" value="bob"><label for="job">Job</label><input name="job" type="text" value="hexlet"></form>');
})

test("form with textarea", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name", {as: 'textarea'})
    }))
        .toBe('<form method="post" action="#"><label for="name">Name</label><textarea cols="20" rows="40" name="name">bob</textarea></form>');
})

test("form with sized textarea", () => {
    expect(HexletCode.formFor(template, {}, (f) => {
        f.input("name", {as: 'textarea', cols: 50, rows: 50})
    }))
        .toBe('<form method="post" action="#"><label for="name">Name</label><textarea cols="50" rows="50" name="name">bob</textarea></form>');
})




test("form with sized textarea with button", () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
        f.input('name');
        f.input('job', {as: 'textarea'});
        f.submit();
    });
    expect(form).toBe('<form method="post" action="#"><label for="name">Name</label><input name="name" type="text" value="bob"><label for="job">Job</label><textarea cols="20" rows="40" name="job">hexlet</textarea><input type="submit" value="Save"></form>');
})

