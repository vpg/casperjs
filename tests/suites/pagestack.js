/*eslint strict:0, max-statements:0*/
var pagestack = require('pagestack');
var utils = require('utils');
var webpage = require('webpage');

casper.test.begin('pagestack module tests', 20, function(test) {
    var stack = pagestack.create();
    var page1 = webpage.create();
    page1.url = 'page1.html';
    stack.push(page1);
    test.assertEquals(stack.length, 1);
    test.assert(utils.isWebPage(stack[0]));
    test.assertEquals(stack[0], page1);
    test.assertEquals(stack.list().length, 1);
    test.assertEquals(stack.list()[0], page1.url);

    var page2 = webpage.create();
    page2.url = 'page2.html';
    stack.push(page2);
    test.assertEquals(stack.length, 2);
    test.assert(utils.isWebPage(stack[1]));
    test.assertEquals(stack[1], page2);
    test.assertEquals(stack.list().length, 2);
    test.assertEquals(stack.list()[1], page2.url);

    //test find default behavior (w/oput args)
    test.assertEquals(stack.find(), page1);
    test.assertEquals(stack.find(null), page1);
    //test find by index
    test.assertEquals(stack.find(1), page2);
    test.assertEquals(stack.findByIndex(1), page2);
    test.assertRaises(function(popupIndex) {
        stack.findByIndex(popupIndex);
    }, [2], 'Error has been raised.');

    test.assertEquals(stack.clean(), 1);
    test.assertEquals(stack[0], page2);
    test.assertEquals(stack.list().length, 1);
    test.assertEquals(stack.list()[0], page2.url);
    test.assertEquals(stack.findByIndex(0), page2);

    test.done();
});
