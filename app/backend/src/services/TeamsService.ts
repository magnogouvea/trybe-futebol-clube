import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  private model = Teams;

  public async getTeams(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
