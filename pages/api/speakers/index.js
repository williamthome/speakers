import { NextApiRequest, NextApiResponse } from "next"
import { getDbSpeakersData, setDbSpeakersData } from "../../../src/api"

/**
 * Handler
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  const { method, } = req

  const methodAction = {
    ["GET"]: getMethod,
    ["POST"]: postMethod,
  }

  const action = methodAction[method]

  if (!action)
    return res.status(501).json({ name: "ServerCannotAcceptArgument", msg: `Method ${method} not implemented` })

  try {
    await action(req, res)
  } catch (reason) {
    res.status(500).json(reason)
  }
}

/**
 * Get all speakers
 *
 * @param {NextApiRequest} _req
 * @param {NextApiResponse} res
 */
async function getMethod(_req, res) {
  const speakers = await getDbSpeakersData()
  res.status(200).json(speakers)
}

/**
 * Add a speaker
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function postMethod(req, res) {
  const { body: speaker } = req

  if (!speaker || speaker !== Object(speaker))
    return res.status(400).json({ name: "BadRequest", msg: "Invalid payload" })

  if (!speaker.first)
    return res.status(400).json({ name: "BadRequest", msg: "First name is required" })

  const speakers = await getDbSpeakersData()
  const newSpeakers = [speaker, ...speakers]
  await setDbSpeakersData(newSpeakers)

  res.status(200).json(newSpeakers)
}