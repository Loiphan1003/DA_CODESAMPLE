﻿
using CodeSampleAPI.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public interface IRunCodeService
    {
        Task<RunCodeResponse> callAPI(RunCodeRequest runCodeRequest);
    }
    public class RunCodeService: IRunCodeService
    {
        public async Task<RunCodeResponse> callAPI(RunCodeRequest runCodeRequest)
        {
            using (var client = new HttpClient())
            {
                //var url = "https://codex.jaagrav.in/";
                //var url = "https://codex-api.herokuapp.com/";
                var url = "https://compile-run-co-prod-compile-run-code-tqoamn.mo1.mogenius.io/";
                //var url = "https://compile-run-code.herokuapp.com/";

                var data = new[]
                {
                      new KeyValuePair<String, String>("code", runCodeRequest.Code),
                      new KeyValuePair<String, String>("input" , runCodeRequest.Input),
                      new KeyValuePair<String, String>("language" , runCodeRequest.Language)
                };

                var response = await client.PostAsync(url,  new FormUrlEncodedContent(data));

                if (response.IsSuccessStatusCode)
                {
                    var stringData = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<RunCodeResponse>(stringData);
                    return result;
                }

            }
            return null;
        }
    }
}
