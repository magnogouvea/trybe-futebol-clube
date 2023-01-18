import IMatch from '../entities/IMatch';
import Matches from '../database/models/MatchesModel';

export default class MatchesService {
  private model = Matches;

  public async findAllMatches() {
    const matches = await this.model.findAll({ include: ['teamHome', 'teamAway'] });
    return matches;
  }

  public async findMatchesInProgress(inProgress: boolean) {
    const filterMatches = await this.model.findAll({
      where: { inProgress },
      include: ['teamHome', 'teamAway'],
    });
    return filterMatches;
  }

  public async saveMatchesInProgress(saveMatch: IMatch): Promise<IMatch> {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = saveMatch;
    const createMatch = await this.model.create({ ...saveMatch, inProgress: true });
    return {
      id: createMatch.id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    };
  }

  public async updateMatchGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async updateStatusMatches(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
