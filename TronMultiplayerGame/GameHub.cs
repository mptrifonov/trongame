using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using TronMultiplayerGame.Models;

namespace TronMultiplayerGame
{
    public class GameHub : Hub
    {
        private GameManager _gameManager;

        public GameHub()
            : this(GameManager.Instance)
        {
        }

        public GameHub(GameManager gameManager)
        {
            _gameManager = gameManager;
        }
        
        public void NewSnake(string serializedSnake)
        {
            var snake = JsonConvert.DeserializeObject<Snake>(serializedSnake);
            var exists = _gameManager.Snakes.ContainsKey(snake.id);

            if (!exists)
            {
                _gameManager.Snakes.TryAdd(snake.id, snake);
            }
        }

        public void DeadSnake(string id)
        {
            _gameManager.Snakes.TryRemove(id, out Snake deadSnake);
        }

        public void UpdatePosition(string snakeJson)
        {
            var snake = JsonConvert.DeserializeObject<Snake>(snakeJson);
            _gameManager.Snakes.TryGetValue(snake.id, out Snake existingSnake);

            if (existingSnake != null)
            {
                existingSnake.x     = snake.x;
                existingSnake.y     = snake.y;
                existingSnake.tail  = snake.tail;
                existingSnake.trail = snake.trail;
            }
        }

    }
}

