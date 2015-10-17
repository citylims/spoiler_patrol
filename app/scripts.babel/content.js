function spoilerSearch(word) {
  var str = word;
  console.log(word);
  if (str === '') {
    return;
  }
  var regex = new RegExp('\\b' + str + '\\b', 'gi');
  var matchRegex = $(document.body).text().match(regex);
  var count = matchRegex ? matchRegex.length : 0;
}
