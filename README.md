# alexa-webhook

**Integration of Amazon Alexa and their devices like (Echo, Echo dot, etc) to your bot platform**. A simple and basic implementation of integration of alexa skill to your bot platform. In this I have kept two layers one is alexa-webhook and other one is bot-webhook(I have tried to emulate a simple end point of your bot webhook layer in bot-webhook dir in this project), the reason for doing this was so that one can create multiple instances of their own webhook without changing much of their webhook layer other than the endpoint.

----------
The thing with alexa custom skill integration is we have to manage the sessions at our own end, hence we have to send response in their response object given at their request time to our servers https link.
Therefore its a challenge if we directly accomdate it our webhook end. Well presently Im storing it on runtime and deleting it too with every request answered, but incase of a very busy server one can go for Redis db.
