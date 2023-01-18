import ILeaderboard from '../entities/ILeaderboard';
import TeamsService from './TeamsService';
import TeamsModel from '../database/models/TeamsModel';
import MatchesService from './MatchesService';
import MatchesModel from '../database/models/MatchesModel';

export default class LeaderboardService {
  private matchesService = new MatchesService();
  private teamService = new TeamsService();
  private leaderboardData: ILeaderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  private async allTeamsAndMatches(): Promise<{ teams: TeamsModel[], matches: MatchesModel[] }> {
    const teams = await this.teamService.getTeams();
    const matches = await this.matchesService.findAllMatches();
    return { teams, matches };
  }

  private sortData = (teams: ILeaderboard[]): ILeaderboard[] => (
    teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return 0;
    }));

  private fillLeaderboardHome(team: TeamsModel, matches: MatchesModel[]) {
    const data = { ...this.leaderboardData };
    matches.forEach((match) => {
      if (match.homeTeam === team.id && !match.inProgress) {
        data.name = team.teamName;
        data.totalGames += 1;
        data.goalsFavor += match.homeTeamGoals;
        data.goalsOwn += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) data.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) data.totalDraws += 1;
        if (match.homeTeamGoals < match.awayTeamGoals) data.totalLosses += 1;
        data.goalsBalance = data.goalsFavor - data.goalsOwn;
        data.totalPoints = (data.totalVictories * 3) + data.totalDraws;
        data.efficiency = ((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2);
      }
    });
    return data;
  }

  private fillLeaderboardAway(team: TeamsModel, matches: MatchesModel[]) {
    const data = { ...this.leaderboardData };
    matches.forEach((match) => {
      if (match.awayTeam === team.id && !match.inProgress) {
        data.name = team.teamName;
        data.totalGames += 1;
        data.goalsFavor += match.awayTeamGoals;
        data.goalsOwn += match.homeTeamGoals;
        if (match.awayTeamGoals > match.homeTeamGoals) data.totalVictories += 1;
        if (match.awayTeamGoals === match.homeTeamGoals) data.totalDraws += 1;
        if (match.awayTeamGoals < match.homeTeamGoals) data.totalLosses += 1;
        data.goalsBalance = data.goalsFavor - data.goalsOwn;
        data.totalPoints = (data.totalVictories * 3) + data.totalDraws;
        data.efficiency = ((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2);
      }
    });
    return data;
  }

  private fillLeaderboard(team: TeamsModel, matches: MatchesModel[]) {
    const data = { ...this.leaderboardData };
    matches.forEach((match) => {
      const curTeam = match.awayTeam === team.id ? 'awayTeam' : 'homeTeam';
      const oposite = match.awayTeam === team.id ? 'homeTeam' : 'awayTeam';
      if ((match.awayTeam === team.id || match.homeTeam === team.id) && !match.inProgress) {
        data.name = team.teamName;
        data.totalGames += 1;
        data.goalsFavor += match[`${curTeam}Goals`];
        data.goalsOwn += match[`${oposite}Goals`];
        if (match[`${curTeam}Goals`] > match[`${oposite}Goals`]) data.totalVictories += 1;
        if (match[`${curTeam}Goals`] === match[`${oposite}Goals`]) data.totalDraws += 1;
        if (match[`${curTeam}Goals`] < match[`${oposite}Goals`]) data.totalLosses += 1;
        data.goalsBalance = data.goalsFavor - data.goalsOwn;
        data.totalPoints = (data.totalVictories * 3) + data.totalDraws;
        data.efficiency = ((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2);
      }
    });

    return data;
  }

  public async mountLeaderboardHome() {
    const data = await this.allTeamsAndMatches();
    const filledData = data.teams.map((team) =>
      this.fillLeaderboardHome(team, data.matches));

    return this.sortData(filledData);
  }

  public async mountLeaderboardAway() {
    const data = await this.allTeamsAndMatches();
    const filledData = data.teams.map((team) =>
      this.fillLeaderboardAway(team, data.matches));

    return this.sortData(filledData);
  }

  public async mountLeaderboard() {
    const data = await this.allTeamsAndMatches();
    const filledData = data.teams.map((team) =>
      this.fillLeaderboard(team, data.matches));

    return this.sortData(filledData);
  }
}
