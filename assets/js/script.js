const { createApp } = Vue;

createApp({
    data() {
        return {
          searchText: '', //testo inserito nell'input di ricerca
          activeContact: 0, //indice del contatto attivo all'interno di filteredContacts
          userText: '',
          contacts: [{
                name: 'Michele',
                avatar: 'assets/img/avatar_1.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Fabio',
                avatar: 'assets/img/avatar_2.jpg',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                  },
                  {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                  },
                  {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Samuele',
                avatar: 'assets/img/avatar_3.jpg',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                  },
                  {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                  },
                  {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Luisa',
                avatar: 'assets/img/avatar_4.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                  }
                ],
              },
          ],
        };
    },
        
    methods: {
      selectContact(index) {
        //svuoto l'input quando cambio chat
        this.userText = '';
        this.activeContact = index;
        // const filteredIndex = this.contacts.indexOf(this.filteredContacts[index]);
        // this.activeContact = filteredIndex;
        console.log(this.activeContact);
      },
      //filtro i contatti
      filterContacts() {
        console.log(this.searchText);
        const search = this.searchText.toLowerCase();
        this.contacts.forEach((contact) => {
            //controllo se il nome del contatto include il testo di ricerca
            const name = contact.name.toLowerCase();
            contact.visible = name.includes(search);
        });
        //console.log(this.filteredContacts);
      },
      //invio messaggio
      
      sendMessage() {
        if (this.userText.trim() === '') {
            //non invio messaggi vuoti
            return;
        }
        //recupero ore e minuti
        const now = new Date();
        //formatto ore e minuti con due cifre
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        const userMessage = {
            date: formattedTime,
            message: this.userText,
            status: 'sent'
        };

        // console.log(this.userText);

        this.contacts[this.activeContact].messages.push(userMessage);

        //svuoto input dopo invio
        this.userText = '';

        //messaggio di risposta
        setTimeout(() => {
            const replyMessage = {
                date: formattedTime,
                message: 'Ok!',
                status: 'received'
            };

            console.log('messaggio inviato');

            this.contacts[this.activeContact].messages.push(replyMessage);
        }, 1000);
      },

      formatTime(dateTime) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleTimeString([], options);
      },
    
      // Funzione per dropdown
      
      

    },
    //ad applicazione creata
    created() {
      this.filteredContacts = this.contacts; //ALL'INIZIO MOSTRA TUTTI I CONTATTI
      this.activeFilteredContact = 0; //imposta l'indice del contatto attivo iniziale
    }
}).mount('#app');
