import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProviderEthe {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}