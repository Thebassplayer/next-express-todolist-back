import { auth } from "express-oauth2-jwt-bearer";
const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:8000/api";

export const checkJwt = auth({
  audience,
  issuerBaseURL,
  tokenSigningAlg: "RS256",
});

const result = console.log(checkJwt);
