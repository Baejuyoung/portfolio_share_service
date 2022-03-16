import { ProjectModel } from "../schemas/Project";

class Project {
    static async create({ newProject }) {
        const createdProject = await ProjectModel.create(newProject);
        return createdProject;
    }

    static async exists({ object }) {
        const exists = await ProjectModel.exists({ object });
        return exists;
    }

    static async findById({ id }) {
        const project = await ProjectModel.findOne({ id });
        return project;
    }

    static async findAll({ user_id }) {
        const projects = await ProjectModel.find({ user_id });
        return projects;
    }

    static async update({ id }, newProject) {
        const updatedProject = await ProjectModel.findOneAndUpdate({ id }, newProject);
        return updatedProject;
    }
}

export { Project };
