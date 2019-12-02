using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(TronMultiplayerGame.Startup))]

namespace TronMultiplayerGame
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
