import axios from 'axios'
import moment from 'moment'

/*
  example api json endpoints
-----------------------------------------
__mlb__   http://gd2.mlb.com/components/game/mlb/year_2016/month_08/day_19/master_scoreboard.json   [master]
          http://gd2.mlb.com/components/game/mlb/year_2016/month_07/day_01/miniscoreboard.json      [mini]

__nfl__   http://www.nfl.com/liveupdate/scores/scores.json  [scores]
          http://feeds.nfl.com/feeds-rs/teams/2016.json     [teams]

__nba__   http://data.nba.com/data//json/nbacom/2016/gameline/20161025/games.json         [simple]
          http://data.nba.com/data/5s/json/cms/noseason/scoreboard/20161025/games.json    [detailed]

__nhl__   https://statsapi.web.nhl.com/api/v1/schedule?startDate=2016-10-12&endDate=2016-10-12

__epl__   https://footballapi.pulselive.com/football/fixtures?comps=1&compSeasons=54&page=0&pageSize=40&sort=desc&statuses=C&altIds=true [scores]
          https://footballapi.pulselive.com/football/compseasons/54/teams [teams]
-----------------------------------------
*/



export function formatDateUrl() {
  return moment().format('YYYYMMDD')
}

export function getMlbScores(dt) {
  if (dt === undefined)
    dt = formatDateUrl()
  const yyyy = dt.slice(0,4)
  const mm = dt.slice(4,6)
  const dd = dt.slice(6,8)
  const url = `http://gd2.mlb.com/components/game/mlb/year_${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
  return axios.get(url)
    .then((currentScores) => (dt, currentScores.data))
    .catch((currentScores) => (dt, currentScores.status))
}














export function getMlbStandings() {
  const dt = moment().format('YYYYMMDD')
  const year = dt.slice(0,4)
  const month = dt.slice(4,6)
  const today = dt.slice(6,8)
  const url = `http://mlb.mlb.com/lookup/json/named.standings_schedule_date.bam?season=${year}&schedule_game_date.game_date=%27${year}/${month}/${today}%27&sit_code=%27h0%27&league_id=103&league_id=104&all_star_sw=%27N%27&version=2`
  return axios.get(url)
    .then((currentStandings) => currentStandings.data)
    .catch((currentStandings) => currentStandings.status)
}
