  // redirect from http to https
  var host = "vuoto.xyz"
  if (window.location.host == host && window.location.protocol != "https:") {
    window.location.protocol = "https:"
  }
