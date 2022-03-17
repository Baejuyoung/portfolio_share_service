import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

certificateRouter.post("/certificate/create", login_required, async (req, res, next) => {
    try {
        const { currentUserId } = req;
        const { title, description, when_date } = req.body;
        const newCertificate = await certificateService.addCertificate({
            user_id: currentUserId,
            title,
            description,
            when_date,
        });

        if (newCertificate.errorMessage) {
            throw new Error(newCertificate.errorMessage);
        }

        return res.status(201).json(newCertificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.get("/certificates/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        const certificate = await certificateService.getCertificate({ id });

        if (certificate.errorMessage) {
            throw new Error(certificate.errorMessage);
        }

        return res.status(200).json(certificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.get("/certificatelist/:user_id", async function (req, res, next) {
    try {
        const { user_id } = req.params;
        const certificates = await certificateService.getCertificateAll({ user_id });

        if (certificates.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).json(certificates);
    } catch (error) {
        next(error);
    }
});

certificateRouter.put("/certificates/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { currentUserId } = req;
        const { title, description, when_date } = req.body;
        const toUpdate = { title, description, when_date };

        // req.currentUserId의 값과 Certificate.user_id의 값을 비교해 관리자 인증
        const certificate = await certificateService.getCertificate({ id });
        if (String(currentUserId) !== String(certificate.user_id)) {
            throw new Error("접근할 권한이 없습니다.");
        }

        const updatedCertificate = await certificateService.updateCertificate({ id }, toUpdate);

        if (updatedCertificate.errorMessage) {
            throw new Error(updatedCertificate.errorMessage);
        }

        return res.status(200).json(updatedCertificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.delete("/certificates/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { currentUserId } = req;

        // req.currentUserId의 값과 Certificate.user_id의 값을 비교해 관리자 인증
        const certificate = await certificateService.getCertificate({ id });
        if (String(currentUserId) !== String(certificate.user_id)) {
            throw new Error("접근할 권한이 없습니다.");
        }

        const deletedCertificate = await certificateService.deleteCertificate({ id });

        if (deletedCertificate.errorMessage) {
            throw new Error(deletedCertificate.errorMessage);
        }

        return res.status(200).json({ result: "success" });
    } catch (error) {
        next(error);
    }
});

export { certificateRouter };
