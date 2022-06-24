# League Winrate Calculator
League Winrate Calculator is a machine learning based web application that takes in the names and champions of players in a ranked lobby and makes a prediction which team will win.

The winrate for a given lobby is calculated using player ranked winrate, the champion overall winrate, and player specific champion winrate. The current deployed version of the model was trained without any enemy player information.

The "One Sided" model was trained using ~3600 ranked games (~400 games from each division ranging from Gold 1 to Diamond 1) and preliminary testing of 300 randomly selected games from Gold 1 to Diamond 1 gave an 82% accuracy rate in predicting the correct outcome.

# Future Work
* Increase the number of parameters that are taken into account when calculating a games winrate
    * Champions
    * Games played
    * Gold per minute
    * etc.
* Increase accuracy of "One Sided" model by collecting more game data points and increasing model inputs.
* Release the "Two Sided" model for more accurate post-champion select predictions.
