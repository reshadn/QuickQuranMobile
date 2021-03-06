
test(function() {
  var u = new URL('http://a/foo');
  var u2 = new URL('bar', u);
  assert_equals(u.href, 'http://a/foo');
}, 'Consistency Check');

var setup = async_test("Loading data…")
setup.step(function() {
  var request = new XMLHttpRequest()
  request.open("GET", "urltests.txt")
  request.send()
  request.responseType = "text"
  request.onload = setup.step_func(function() {
    runURLTests(request.response);
    setup.done()
  })
})

function setBase(base) {
  document.getElementById("base").href = base
}

function bURL(url, base) {
  base = base || "about:blank"
  setBase(base)
  var a = document.createElement("a")
  a.setAttribute("href", url)
  return a
}

function runURLTests(raw) {
  var urltests = URLTestParser(raw)
  for(var i = 0, l = urltests.length; i < l; i++) {
    var expected = urltests[i]
    test(function() {
      var url = bURL(expected.input, expected.base)

      assert_equals(url.protocol, expected.protocol, "scheme")
      assert_equals(url.hostname, expected.host, "host")
      assert_equals(url.port, expected.port, "port")
      assert_equals(url.pathname, expected.path, "path")
      assert_equals(url.search, expected.search, "search")
      assert_equals(url.hash, expected.hash, "hash")
      assert_equals(url.href, expected.href, "href")
    }, "Parsing: <" + expected.input + "> against <" + expected.base + ">")
  }
}
