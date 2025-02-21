import { requestHandler } from "@/services/requestHandler";
import { apiRoutes } from "@/utils/api-routes";
import { urlPathBuilder } from "../utils/helpers";

export const getAllCompetitions = async () =>
  await requestHandler("get", apiRoutes.contest.get);

export const getCompetitionById = async (competitionId) =>
  await requestHandler(
    "get",
    urlPathBuilder(apiRoutes.contest.getById, { competitionId })
  );

export const getLeaderboard = async (competitionId) =>
  await requestHandler(
    "get",
    urlPathBuilder(apiRoutes.contest.leaderboard, { competitionId })
  );
export const joinCompetition = async (formData, competitionId) =>
  await requestHandler(
    "post",
    urlPathBuilder(apiRoutes.contest.join, { competitionId }),
    formData
  );

export const getEntryById = async (entryId) =>
  await requestHandler(
    "get",
    urlPathBuilder(apiRoutes.contest.entry, { entryId })
  );

export const submitEntry = async (formData, competitionId) =>
  await requestHandler(
    "post",
    urlPathBuilder(apiRoutes.contest.submit, { competitionId }),
    formData
  );
