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
    ["PUT"]: putMethod,
    ["DELETE"]: deleteMethod,
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
 * Get one speaker by id
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function getMethod(req, res) {
  const { query: { id }, } = req

  const speakers = await getDbSpeakersData()
  const speaker = speakers.find(s => s.id === id)

  return speaker
    ? res.status(200).json(speaker)
    : res.status(404).json({ name: "NotFound", msg: `Could not find speaker by id ${id}` })
}

/**
 * Update one speaker by id
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function putMethod(req, res) {
  const { query: { id }, body, } = req

  const speakers = await getDbSpeakersData()
  const speaker = speakers.find(s => s.id === id)

  if (!speaker)
    return res.status(404).json({ name: "NotFound", msg: `Could not find speaker by id ${id}` })

  if (body.id) delete body.id

  const speakerUpdated = {
    ...speaker,
    ...body,
  }

  const speakersUpdated = speakers.map(
    s => s.id === id ? speakerUpdated : s
  )
  await setDbSpeakersData(speakersUpdated)

  res.status(200).json(speakerUpdated)
}

/**
 * Delete one speaker by id
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function deleteMethod(req, res) {
  const { query: { id }, } = req

  const speakers = await getDbSpeakersData()
  const speaker = speakers.find(s => s.id === id)

  if (!speaker)
    return res.status(404).json({ name: "NotFound", msg: `Could not find speaker by id ${id}` })

  const filteredSpeakers = speakers.filter(s => s.id !== id)
  await setDbSpeakersData(filteredSpeakers)

  return res.status(204).send()
}