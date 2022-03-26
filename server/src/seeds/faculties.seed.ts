import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Command } from 'nestjs-command';
import { Faculty, IFacultyModel } from 'src/faculties/schemas/faculty.schema';

@Injectable()
export class FacultiesSeed {
    constructor(@InjectModel(Faculty.name) private readonly facultyModel: IFacultyModel) { }
    private readonly logger = new Logger(FacultiesSeed.name);


    @Command({ command: 'seed:faculties', describe: 'Seed faculties' })
    async seed() {
        this.logger.log('Seeding faculties...');

        const faculties: Faculty[] = [
            {
                name: 'Gryffindor',
                abbreviation: 'GFDR',
            },
            {
                name: 'Slytherin',
                abbreviation: 'SLTHR',
            },
            {
                name: 'Hufflepuff',
                abbreviation: 'HFPF'
            },
            {
                name: 'Ravenclaw',
                abbreviation: 'RVCLW'
            }
        ]

        await Promise.all(faculties.map(x => new this.facultyModel(x).save()))

        this.logger.log('Seeding faculties done');
    }

}
