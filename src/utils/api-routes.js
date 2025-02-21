import { API_BASE_URL } from "@/utils/constants";

export const apiRoutes = {
  auth: {
    register: `${API_BASE_URL}/users/user/`,
    login: `${API_BASE_URL}/users/auth/login`,
  },
  user: {
    details: `${API_BASE_URL}/user/details`,
  },
  contest: {
    get: `${API_BASE_URL}/contest/get`,
    getById: `${API_BASE_URL}/contest/get?competition_id=:competitionId`,
    entry: `${API_BASE_URL}/contest/entry/:entryId`,
    leaderboard: `${API_BASE_URL}/contest/leaderboard/:competitionId`,
    join: `${API_BASE_URL}/contest/join/:competitionId`,
    submit: `${API_BASE_URL}/contest/submit/:competitionId`,
  },
};
