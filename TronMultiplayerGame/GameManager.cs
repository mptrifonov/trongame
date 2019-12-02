using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Threading;
using TronMultiplayerGame.Models;

namespace TronMultiplayerGame
{
    public class GameManager
    {
        private readonly static Lazy<GameManager> _instance = new Lazy<GameManager>(() => new GameManager());

        private readonly TimeSpan broadcastInterval = TimeSpan.FromMilliseconds(80);
        private readonly IHubContext _hubContext;
        private Timer _gameLoop;

        public ConcurrentDictionary<string, Snake> Snakes { get; set; }

        public static GameManager Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        public GameManager()
        {
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();

            Snakes = new ConcurrentDictionary<string, Snake>();

            _gameLoop = new Timer(Broadcast, null, broadcastInterval, broadcastInterval);
        }

        private void Broadcast(object state)
        {
            var listOfSnakes = JsonConvert.SerializeObject(Snakes.Values);
            _hubContext.Clients.All.updateState(listOfSnakes);
        }
    }
}