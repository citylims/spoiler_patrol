function spoilerSearch(word) {
  console.log(word);
  var str = word;
  console.log(word);
  if (str === '') {
    return;
  }
  var regex = new RegExp('\\b' + str + '\\b', 'gi');
  var matchRegex = $(document.body).text().match(regex);
  var count = matchRegex ? matchRegex.length : 0;
  console.log(count);
  chrome.runtime.sendMessage({
      message: count
  });
}


spoilerSearch("spoiler")
