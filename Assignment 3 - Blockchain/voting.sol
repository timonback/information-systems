pragma solidity ^0.4.0;

/** @title Shareholder Voting Contract */
contract Ballot {
    struct Shareholder {
        // Whether the shareholder has already voted
        bool hasVoted;
        // Key exists flag.
        bool exists;
    }
    
    struct Question {
        // Mapping of the allowed shareholders for this question
        mapping(address => Shareholder) participants;
        // The actual question
        string question;
        // Can the question still be answered?
        bool isOpen;
        // The outcome counter of the question
        int8 result;
    }
    
    event QuestionAsked (
        address indexed _from,
        uint256 indexed _questionIndex
    );
    event QuestionVoted (
        address indexed _from,
        uint256 indexed _questionIndex
    );
	
    enum QuestionOutcome {Accepted, Tied, Denied}

    address director;
    Question[] questions;
    
    /** @dev Creates a new contract
      */
    function Ballot() public {
        director = msg.sender;
    }
    
    /** @dev Lets everyone see the question
      * @param index The number of the question
      * @return res The actual question
      */
    function seeQuestion(uint8 index) public constant returns (string) {
        return (questions[index].question);
    }
    
    /** @dev Lets the deployer add a new question
     * (Sends out an event after)
      */
    function addQuestion(string questionStr) public {
        require(msg.sender == director);
        
        questions.push(Question({question: questionStr, isOpen: true, result: 0}));
        
        // send notification event
        QuestionAsked(msg.sender, questions.length);
    }
    
    /** @dev Add a new shareholder to the question
      * @param index The number of the question
      * @param shareholderAdr The address of the shareholder
      */
    function addParticipant(uint8 index, address shareholderAdr) public {
        require(msg.sender == director);
        
        Question storage question = questions[index];
        require(question.isOpen);
        
        Shareholder storage shareholder = question.participants[shareholderAdr];
        shareholder.exists = true;
        shareholder.hasVoted = false;
    }
    
    /** @dev Remove a shareholder from a question
      * @param index The number of the question
      * @param shareholderAdr The address of the shareholder
      */
    function removeParticipant(uint8 index, address shareholderAdr) public {
        require(msg.sender == director);
        
        Question storage question = questions[index];
        require(question.isOpen);
        
        Shareholder storage shareholder = question.participants[shareholderAdr];
        require(shareholder.exists);
        require(!shareholder.hasVoted);
        
        delete question.participants[shareholderAdr];
    }
    
    /** @dev Let a shareholder vote on a question
     * (Sends out an event after)
      * @param index The number of the question
      * @param vote the actual vote
      */
    function voteQuestion(uint8 index, bool vote) public {
        Question storage question = questions[index];
        require(question.isOpen);
        
        Shareholder storage shareholder = question.participants[msg.sender];
        require(shareholder.exists);
        require(!shareholder.hasVoted);
        shareholder.hasVoted = true;
        if(vote) {
            question.result = question.result + 1;
        } else {
           question.result = question.result - 1; 
        }
        
        // Inform that a shareholder has voted
        QuestionVoted(msg.sender, index);
    }
    
    /** @dev Lets the deployer close a question/ stop the voting
      * @param index The number of the question
      */
    function closeQuestion(uint8 index) public {
        require(msg.sender == director);
        
        Question storage question = questions[index];
        require(question.isOpen);
        question.isOpen = false;
    }
    
    /** @dev See the result/outcome of a question
      * @param index The number of the question
      * @return validDecision Whether the question has a clear outcome (not a tie)
      * @return questionAccepted The outcome (TRUE=accepted, FALSE=denied)
      */
    function questionResult(uint8 index) public constant returns (QuestionOutcome) {
        Question storage question = questions[index];
        if(msg.sender != director) {
            // Everyone except the director has to wait for the question to be
            // closed to see the result
            require(!question.isOpen);
        }
        
        if(question.result != 0) {
            if(int8(0) < question.result) {
                return QuestionOutcome.Accepted;
            }
            return QuestionOutcome.Denied;
        }
        return QuestionOutcome.Tied;
    }
}
