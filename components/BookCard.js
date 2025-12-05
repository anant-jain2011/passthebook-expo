
import React, { useState } from 'react';
import Button from '@/components/Button';
import { useToast } from '@/hooks/use-toast';
import { Book, MapPin, User, X } from 'lucide-react';
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const BookCard = ({ book, className }) => {
  const { toast } = useToast();
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');

  // Define board badge colors
  const boardColors = {
    "UK Board": ["oklch(96.2% 0.044 156.743)", "oklch(39.3% 0.095 152.535)"],
    CBSE: ["oklch(93.2% 0.032 255.585)", "oklch(37.9% 0.146 265.522)"],
    ICSE: ["oklch(97.6% 0.083 94.735)", "oklch(44.3% 0.146 94.735)"],
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this message to the backend
    console.log('Sending message to owner:', { bookId: book.id, message });
    
    // Show success toast
    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${book.ownerName}.`,
    });
    
    // Reset and close the form
    setMessage('');
    setShowContactForm(false);
  };

  return (
    <ScrollView
      className={
        "glass-panel p-5 transition-all duration-300 hover:shadow-lg transform hover:translate-y-[-4px] relative" +
        className
      }
    >
      <ThemedView className="flex flex-col h-full">
        <ThemedView className="flex justify-between items-start mb-4">
          <ThemedView>
            <ThemedText className="inline-block text-xs font-medium text-book-blue bg-book-light-blue px-2 py-1 rounded-full mb-2">
              {book.subject}
            </ThemedText>
            <ThemedText className="text-xl font-semibold text-book-charcoal mb-1">
              {book.title}
            </ThemedText>
            <ThemedView className="flex items-center text-gray-500 text-sm">
              <Book size={14} className="mr-1 text-book-blue" />
              <ThemedText>Grade {book.grade}</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedText
            className={"text-xs px-2 py-1 rounded-full font-medium"}
            style={{
              backgroundColor: boardColors[book.board][0],
              color: boardColors[book.board][1],
            }}
          >
            {book.board}
          </ThemedText>
        </ThemedView>

        <ThemedView className="flex-grow">
          <ThemedView className="flex items-center mb-2 text-gray-600 text-sm">
            <MapPin size={14} className="mr-1 text-book-blue" />
            <ThemedText>{book.location}</ThemedText>
          </ThemedView>

          <ThemedView className="flex items-center mb-4 text-gray-600 text-sm">
            <User size={14} className="mr-1 text-book-blue" />
            <ThemedText>Listed by {book.ownerName}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView className="pt-4 border-t border-gray-100">
          <ThemedText
            className="w-full rounded-full bg-book-blue text-base py-1.5 cursor-pointer hover:bg-blue-300/90 text-white transition-all duration-300"
            onClick={() => setShowContactForm(true)}
          >
            Contact Owner
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Contact Form Overlay */}
      {showContactForm && (
        <ThemedView className="absolute inset-0 bg-white bg-opacity-95 z-10 p-5 rounded-lg animate-fade-in">
          <ThemedView className="flex justify-between items-center mb-4">
            <ThemedText className="font-semibold">
              Contact {book.ownerName}
            </ThemedText>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowContactForm(false)}
              className="h-8 w-8"
            >
              <Entypo name="cross" size={18} color="black" />
            </Button>
          </ThemedView>

          <form onSubmit={handleContactSubmit}>
            <ThemedView className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About {book.title}
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-book-blue focus:border-transparent"
                rows={4}
                placeholder={`Hi ${book.ownerName}, I'm interested in your ${book.title} textbook...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </ThemedView>
            <ThemedView className="flex space-x-2">
              <Button
                type="submit"
                className="flex-1 rounded-full bg-book-blue hover:bg-book-blue/90 text-white"
              >
                Send Message
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setShowContactForm(false)}
              >
                Cancel
              </Button>
            </ThemedView>
          </form>
        </ThemedView>
      )}
    </ScrollView>
  );
};

export default BookCard;
