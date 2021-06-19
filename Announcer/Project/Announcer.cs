using System;
using System.Collections.Generic;
using System.Text;
using CitizenFX.Core;
using CitizenFX.Core.Native; 

namespace Server
{ 
    public class Main : BaseScript
    {
        dynamic ESX; 
        static Action<string> print = (string pr) => Debug.WriteLine(pr);




        

        public static void GetJobsHeaders(string jobName, string jobLabel, string playerName, List<object> args)
        {
            StringBuilder builder = new StringBuilder();
            foreach (string value in args)
            {
                builder.Append(value + " ");
            }

            string _image = null;


            switch (jobName)
            {
                case "police":
                {
                    _image = "CHAR_CALL911";
                } 
                break;

                case "ambulance":
                {
                    _image = "CHAR_CALL911";
                }
                break;
                     
                default:
                {
                    _image = "CHAR_LIFEINVADER";
                }
                break;
            }
             

            TriggerClientEvent("esx:showAdvancedNotification", "Annonce " + jobLabel, "~b~@" + playerName, builder.ToString(), _image, -1);

        } 

        public Main()
        {
            TriggerEvent("esx:getSharedObject", new object[] { new Action<dynamic>(esx => {
                ESX = esx;
            })});

    



            API.RegisterCommand("announce", new Action<int, List<object>, string>((source, args, rawCommand) =>
            {
                if (source > 0) 
                {
                    Player player = this.GetPlayerFromId(source);
                    var xPlayer = ESX.GetPlayerFromId(source);
                    var Job = xPlayer.getJob();


                    if (args.Count <= 0) {
                        player.TriggerEvent("esx:showNotification", $"~r~Allert\n~s~Put characters");
                        return;
                    }
                       
                    if (Job.grade_name == "boss")
                    {
                        player.TriggerEvent("esx:showNotification", $"~r~Allert\n~s~You just made a announce for ~b~{Job.label} job");
                        GetJobsHeaders(Job.name, Job.label, player.Name, args);
                    } 
                    else
                    {
                        player.TriggerEvent("esx:showNotification", "~r~Allert\n~s~You cant make a announce you must to be boss");
                    }
                } 
            }), false);
        }



        private void GetJobsHeaders(dynamic name, object v)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Récuperer l'objet player by identifier server
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Player GetPlayerFromId(int id)
        {
            return this.Players[id]; 
        } 


    }
}
 