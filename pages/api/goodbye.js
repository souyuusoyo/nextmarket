const goodbye = (req, res) => {
  return res.status(200).json({message: "さようなら", date: "今日は金曜日です"})
}

export default goodbye