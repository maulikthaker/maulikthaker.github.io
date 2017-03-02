				var page = "";
				if($(".attachments-panel-placeholder")){
					$(".attachments-panel-placeholder").html("");
					// console.log("This is permalink : "+ $('.wrike-panel-header-toolbar').children('a')[0].getAttribute('href'));
					
					page = getPageId("WRIKE_TASK_"+id);
					url = "https://nandwiki.sandisk.com/rest/api/content/"+page+"/child/attachment?start=0&limit=2000"
					console.log("Display attachment URL : " + url);
					jQuery.ajax ({
					    type: "GET",
					    url: url,    
					    dataType: "json",
					    crossDomain: true,
					    async: false,    

				    	success: function (data){
				    			
				    			var result = getExternal(id);
				    			result = result.body.view.value;

				    			result = result.replace(/<p>(.*?)open\.htm(.*?)<\/p>/,"");
				    			result = result.replace(/href/,"target='_blank' href");

								var html = '<hr><div style="padding:15px 15px;text-align: center;background-color:#d9edf7;">Confluence Attachments (<a id="confluencePage" data-confluence-id="'+page+'" target="_blank" href="https://nandwiki.sandisk.com/display/WRIKE/WRIKE_TASK_'+id+'">'+id+'</a>)</div>';
				    			html+='<div id="successUpload">File Upload SuccessFul</div>';
				    			html+='<div style="display:none" id="deleteConfluencePage"></div>'
				    			html+='<div id="green">';
								
								[].forEach.call(data.results, function(d){  
									// console.log(d._links.webui);
									// $(".attachments-panel-placeholder").append('<p><a style="font-size:small;"href="https://nandwiki.sandisk.com'+d._links.webui+'" target="_blank">'+JSON.stringify(d.title)+'</a></p>') 
									html+='<p><a target="_blank" href="https://nandwiki.sandisk.com'+d._links.download+'" target="_blank">'+ d.title+'</a></p>'

								});
								html+='</div>';
								html+='<div id="red">'+result+'</div>';
								html+='<div style="clear: left;"> <div id="green"><form class="ignore"><input type="file" class="ignore" id="file" name="file"><input id="uploadForm" class="buttonignore" type="button" value="Upload"></form></div>';
								html+='<div id="red"><a id="externalLink">Insert External Link</a></div>';
								html+='</div>';
								$(".attachments-panel-placeholder").append(html);
								$("#successUpload").hide();

								
					    },
				    	error : function(xhr, errorText){
				    		if(xhr.statusText == "Not Found"){
				    			console.log("Error in GET :" + url +""+ xhr.status);
				    			$(".attachments-panel-placeholder").append('<hr>');
				    			$(".attachments-panel-placeholder").append('<div style="padding:15px 15px;text-align: center;background-color:#d9edf7;">Confluence Attachments (<a target="_blank" href="https://nandwiki.sandisk.com/display/WRIKE/WRIKE_TASK_'+id+'">'+id+'</a>)</div>');
								
								$(".attachments-panel-placeholder").append('<hr><p> \
									 <form class="ignore">\
									    <input type="file" class="ignore" id="file" name="file">\
									    <input id="uploadForm" class="buttonignore" type="button" value="Upload"><hr></br>\
									    <input id="externalLink"type="button" value="Insert External Link"><hr></br>\
									</form>');
				    		}else{
				    			$(".attachments-panel-placeholder").html('<div style="padding:15px 15px;text-align:center;background-color:#f2dede;"><a target="_blank" href="https://nandwiki.sandisk.com/login.action"> \
				        		Login To Confluence </a> and Refresh Page </div>');
				    		}
				        	
				    	},
				    	complete : function(){
				    		$(".buttonignore").click(function(e){uploadFormData(id,e)});
								$('#externalLink').on('click', function(){
									var linktoAdd = prompt('Paste the link to Add ');
									if(linktoAdd != null){
										addExternal(id, linktoAdd);
									}

								});

				    	}
					});
				}
				else{
						console.log("SanDisk : Not Found");
				}
