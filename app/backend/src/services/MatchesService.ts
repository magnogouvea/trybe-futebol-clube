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
}
