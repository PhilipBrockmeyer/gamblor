/* Completed Game
<li class="schedules-list-date">
    <span class=""><span>Sunday, September 28</span><sup>th</sup></span>
</li>
 <li>schedules-list-matchup</li>
 
<div class="list-matchup-row-center">
    <div class="list-matchup-row-time">
        <span class="time">FINAL</span>
	</div>
	
    <div class="list-matchup-row-tv"></div>
	<div class="list-matchup-row-anim">
	<div class="list-matchup-row-team">
		<span class="team-name away lost">Saints</span>
		<span class="team-logo away saints"><span></span></span>
		<span class="team-score away lost">34</span>
		<span class="team-score home ">37</span>
		<span class="team-logo home falcons"><span></span></span>
		<span class="team-name home ">Falcons</span>
	</div>
</div>
*/

/* Future Game
<li class="schedules-list-date">
    <span class=""><span>Sunday, September 28</span><sup>th</sup></span>
</li>
 
<div class="list-matchup-row-center">
	<div class="list-matchup-row-time">
	    <span class="time">1:00</span>
	    <span class="suff">
		    <span class="pm">PM </span><span class="et">ET</span>
	    </span>				
	</div>
	<div class="list-matchup-row-tv">				
		<span class="nflicon fox" title="FOX"></span>				
	</div>
	<!-- awayAbbr: GB -->
	<!-- homeAbbr: CHI -->
	<div class="list-matchup-row-anim">
		<div class="list-matchup-row-team">
			<span class="team-name away ">Packers</span>
			<span class="team-logo away packers"><span></span></span>
			<span class="at">at</span>
			<span class="team-logo home bears"><span></span></span>
			<span class="team-name home ">Bears</span>
		</div>
   </div>
 </div>
 */

var request = require('request');
var jsdom = require('jsdom');

exports.parser = function (season, week, callback) {
    request.get('http://www.nfl.com/schedules/' + season + '/REG' + week, function (error, response, body) {
        jsdom.env(body, [], function (err, window) {
            var results = parseGamesFromNfl(window);
            callback(results);
        });
    });
};

function parseGamesFromNfl(window) {
    var $ = require('jquery')(window);
    var games = [];
    $("li.schedules-list-matchup:gt(0)").each(function (index, item) {
        var time = $(item).find('span.time').text();
        var date = $(item).prevAll('li.schedules-list-date:last').find('span span').text();
        var row = $(item).find('div.list-matchup-row-team');
        var home = row.find('span.home').text();
        var away = row.find('span.away').text();

        games.push({
            time: time,
            date: date,
            home: home,
            away: away
        });
    });
    
    return games;
}