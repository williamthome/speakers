import { NextApiRequest, NextApiResponse } from "next"
import { restoreDbFromBackup } from "../../../src/api"

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
 * Restore speakers
 *
 * @param {NextApiRequest} _req
 * @param {NextApiResponse} res
 */
async function getMethod(_req, res) {
  const backup = await restoreDbFromBackup()
  res.status(200).json(backup)
}