import axios from 'axios'
import { formatDateUrl } from './utils.js'

const cors = 'https://crossorigin.me/'

/*
  example api json endpoints
-----------------------------------------
__mlb__   http://gd2.mlb.com/components/game/mlb/year_2016/month_08/day_19/master_scoreboard.json   [master]
          http://gd2.mlb.com/components/game/mlb/year_2016/month_08/day_19/miniscoreboard.json      [mini]
__nfl__   http://www.nfl.com/liveupdate/scores/scores.json

__nba__   http://data.nba.com/data//json/nbacom/2016/gameline/20161025/games.json                 [simple]
          http://data.nba.com/data/5s/json/cms/noseason/scoreboard/20161025/games.json            [detailed]
          http://data.nba.com/                                                                    [teams]
          http://data.nba.com/data/5s/json/cms/noseason/scoreboard/2015/playoff_all_games.json    [playoffs]
          http://data.nba.com/data/10s/json/cms/noseason/game/20160225/0021500855/boxscore.json   [single game]
          http://data.nba.com/data/json/cms/2015/league/standings.json                            [standings]

__nhl__   https://statsapi.web.nhl.com/api/v1/schedule?startDate=2016-10-12&endDate=2016-10-12

__epl__   https://footballapi.pulselive.com/football/fixtures?comps=1&compSeasons=54&page=0&pageSize=40&sort=desc&statuses=C&altIds=true [scores]
          https://footballapi.pulselive.com/football/compseasons/54/teams [teams]
-----------------------------------------
*/

//
export function getMlbScores(dt) {
  if (dt === undefined)
    dt = formatDateUrl()
  const yyyy = dt.slice(0, 4)
  const mm = dt.slice(4, 6)
  const dd = dt.slice(6, 8)
  // const url = `${cors}http://gd2.mlb.com/components/game/mlb/year_${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
  const url = `http://gd2.mlb.com/components/game/mlb/year_${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
  return axios.get(url)
    .then((currentScores) => currentScores.data)
    .catch((currentScores) => currentScores.status)
}

var nba_config = {
  headers: { 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json, text/plain, */*'}
}
export function getNbaScores(dt) {
  if (dt === undefined || dt > 20160619 && dt < 20160930)
    dt = '20161025'
  const url = `${cors}http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${dt}/games.json`
  return axios.get(url)
    .then(currentScores => currentScores.data.sports_content.games, nba_config)
    .catch(currentScores => currentScores.status)
}

export function getNbaGameDetails(dt, id) {
  const url = `${cors}http://data.nba.com/data/10s/json/cms/noseason/game/${dt}/${id}/boxscore.json`
  return axios.get(url)
    .then(gameDetails => gameDetails.data.sports_content.game)
    .catch(gameDetails => gameDetails.status)
}

var epl_config = {
  headers: {
    'Origin': 'https://www.premierleague.com',
    'Referer': 'https://www.premierleague.com',
    'Host': 'premierleague.com'
  }
}
export function getNflScores() {
  const url = 'https://footballapi.pulselive.com/football/teams?page=0&pageSize=100&altIds=true&compSeasons=42'
  // const url = 'https://footballapi.pulselive.com/football/fixtures?comps=1&compSeasons=54&page=0&pageSize=40&sort=desc&statuses=C&altIds=true'
  return axios.get(url, epl_config)
    .then((currentScores) => console.log(currentScores.headers))
    .catch((currentScores) => console.log(currentScores.headers))
}

export function getNhlScores(dt) {
  if (dt === undefined)
    dt = '20161012'
  const yyyy = dt.slice(0, 4)
  const mm = dt.slice(4, 6)
  const dd = dt.slice(6, 8)
  const url = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yyyy}-${mm}-${dd}&endDate=${yyyy}-${mm}-${dd}&expand=schedule.teams,schedule.linescore,schedule.scoringplays,schedule.game.seriesSummary`
  return axios.get(url)
    .then((currentScores) => currentScores.data)
    .catch((currentScores) => currentScores.status)
}
