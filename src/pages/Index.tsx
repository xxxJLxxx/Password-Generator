import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      toast({
        title: "Fehler",
        description: "Bitte wähle mindestens eine Option aus.",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    if (!password) {
      toast({
        title: "Kein Passwort",
        description: "Generiere zuerst ein Passwort.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Kopiert!",
        description: "Passwort wurde in die Zwischenablage kopiert.",
      });
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Konnte das Passwort nicht kopieren.",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    if (includeUppercase && /[A-Z]/.test(password)) strength++;
    if (includeLowercase && /[a-z]/.test(password)) strength++;
    if (includeNumbers && /[0-9]/.test(password)) strength++;
    if (includeSymbols && /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength++;

    if (strength <= 2) return { label: "Schwach", color: "bg-destructive" };
    if (strength <= 4) return { label: "Mittel", color: "bg-warning" };
    return { label: "Stark", color: "bg-success" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-strong border-b border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 glass rounded-xl">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Passwort Generator
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Intro Text */}
          <div className="text-center mb-8 animate-fade-in">
            <p className="text-lg text-muted-foreground">
              Erstelle sichere, zufällige Passwörter mit individuellen Optionen
            </p>
          </div>

          {/* Main Card */}
          <div className="glass-strong rounded-3xl p-6 md:p-8 space-y-6 animate-scale-in">
            {/* Password Display */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">
                Generiertes Passwort
              </label>
              <div className="glass rounded-xl p-4 min-h-[60px] flex items-center justify-between group">
                <div className="flex-1 font-mono text-base md:text-lg break-all text-foreground">
                  {password || "Klicke auf Generieren"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="ml-2 hover:bg-primary/20 transition-colors"
                >
                  <Copy className="w-5 h-5 text-primary" />
                </Button>
              </div>
              {password && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-500`}
                      style={{
                        width:
                          strength.label === "Schwach"
                            ? "33%"
                            : strength.label === "Mittel"
                            ? "66%"
                            : "100%",
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Length Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                  Länge
                </label>
                <span className="text-lg font-bold text-primary">{length}</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={8}
                max={32}
                step={1}
                className="cursor-pointer"
              />
            </div>

            {/* Options */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-muted-foreground">
                Optionen
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 glass rounded-lg p-3 hover:bg-primary/5 transition-colors">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(checked) =>
                      setIncludeUppercase(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="uppercase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    Großbuchstaben (A-Z)
                  </label>
                </div>
                <div className="flex items-center space-x-3 glass rounded-lg p-3 hover:bg-primary/5 transition-colors">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={(checked) =>
                      setIncludeLowercase(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="lowercase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    Kleinbuchstaben (a-z)
                  </label>
                </div>
                <div className="flex items-center space-x-3 glass rounded-lg p-3 hover:bg-primary/5 transition-colors">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) =>
                      setIncludeNumbers(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="numbers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    Zahlen (0-9)
                  </label>
                </div>
                <div className="flex items-center space-x-3 glass rounded-lg p-3 hover:bg-primary/5 transition-colors">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) =>
                      setIncludeSymbols(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="symbols"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    Sonderzeichen (!@#$...)
                  </label>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePassword}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl transition-all hover:scale-105 hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Passwort Generieren
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-strong border-t border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Sichere Passwörter für maximalen Schutz
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                100% Sicher
              </span>
              <span>•</span>
              <span>Keine Speicherung</span>
              <span>•</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
