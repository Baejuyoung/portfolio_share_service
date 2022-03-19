import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    static async addProject({ user_id, title, description, from_date, to_date }) {
        const id = uuidv4();
        const newProject = { id, user_id, title, description, from_date, to_date };

        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

        return createdNewProject;
    }

    static async getProject({ id }) {
        const project = await Project.findById({ id });

        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return project;
    }

    static async getProjectAll({ user_id }) {
        const projects = await Project.findAll({ user_id });
        return projects;
    }

    static async setProject({ id }, { toUpdate }) {
        const project = await this.getProject({ id });

        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const setProject = await Project.update({ id }, { toUpdate });

        return setProject;
    }

    static async deleteProject({ id }) {
        const project = await this.getProject({ id });

        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const updateProject = await Project.delete({ id });

        return updateProject;
    }
}

export { projectService };
