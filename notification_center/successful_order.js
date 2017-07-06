module.exports = function (infos) {
  return {
    subject: `Your ${infos.meal_name} is on its way!`,
    body: `${infos.name}, your ${infos.meal_name} is on its way. It will be delivered on ${infos.day} at ${infos.hour}`
  }
}
