import handlebars, { templates } from 'handlebars';
import fs from 'fs';

import IPartMailTemplatDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsTemplateProvider implements IMailTemplateProvider {

    public async parse({file, variables}: IPartMailTemplatDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}