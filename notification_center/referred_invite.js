module.exports = function (infos) {
  return {
    subject: "Vimi, a friend invited you to join!",
    body: `Hi, your friend ${infos.name} invited you to join Vimi.
    When you sign up both of you get 50% off the purchase of your first meal.
    <br/><br/><a href="https://vimifood.com">Find out more about us and sign up<a/>
    `
  }
}