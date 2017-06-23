$('document').ready(function(){
  var names = ['brunofin', 'comster404', 'freecodecamp', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'geoffstorbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
  var streamUrl = '';
  var channelUrl = '';
  var channelData = [];
  var streamData = [];
  var calls = [];
  var html = "<table><th>User</th><th>Status</th>";

  //retrieve data from twitch API
  for (var i = 0; i < names.length; i++) {
    (function(i){
      streamUrl = 'https://wind-bow.gomix.me/twitch-api/streams/' + names[i] + '?callback=?';
      channelUrl = 'https://wind-bow.gomix.me/twitch-api/channels/' + names[i] + '?callback=?'

      calls.push($.getJSON(channelUrl, function(x) {
          channelData[i] = x;
        }));

      calls.push($.getJSON(streamUrl, function(y) {
          streamData[i] = y;
        }));
    })(i);
  }
  
  //When data calls are complete, build table
  $.when.apply($, calls).then(function() {

    for (var j = 0; j < names.length; j++) {
      
      if(channelData[j].error) {
        html += "<tr><td>" + names[j] + "</td><td>Account does not exist</td>";
      } else {
        html += "<tr><td><a href='" + channelData[j].url + "'>" + names[j] + "</a></td>";
        if(!streamData[j].stream) {
          html += "<td>Offline</td>";
        } else {
          html += "<td>Online: <a href='" + streamData[j].stream.channel.url + "'> " + streamData[j].stream.channel.status + "</a></td>";
          }
        }
    }
    html += "</table>";
    $(html).appendTo('#tableContent');
  });
});