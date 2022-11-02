import client from "../database/database";

async function Main() {

  const user = await client.user.create({
    data:{
      name: "John Doe",
      email: "johndoe@test.com",
      avatarUrl: "https://github.com/lucasbatista2408.png"
    }
  })
  
  const pool = await client.pool.create({
    data:{
      title: "Bolão do Jão",
      code: "JAO123",
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id
        }
      }
    }
  })

  const game = await client.game.create({
    data:{
      date: '2022-11-16T15:30:00.279Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'FR',
    }
  })

  const game_two = await client.game.create({
    data:{
      date: '2022-11-19T17:00:00.279Z',
      firstTeamCountryCode: 'JP',
      secondTeamCountryCode: 'BR',

      guesses:{
        create:{
          firstTeamGuess: 1,
          secondTeamGuess: 3,

          participant:{
            connect:{
            userId_poolId:{
              userId: user.id,
              poolId: pool.id
            }
            }
          }
        }
      }
    }
  })

  return;
}

Main();