export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      card: {
        Row: {
          animalName: string
          created_at: string | null
          id: number
          rarity: string
          setId: number
          src: string
          totalVariations: number | null
          variation: number | null
        }
        Insert: {
          animalName: string
          created_at?: string | null
          id?: number
          rarity: string
          setId: number
          src: string
          totalVariations?: number | null
          variation?: number | null
        }
        Update: {
          animalName?: string
          created_at?: string | null
          id?: number
          rarity?: string
          setId?: number
          src?: string
          totalVariations?: number | null
          variation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "card_setId_fkey"
            columns: ["setId"]
            referencedRelation: "set"
            referencedColumns: ["id"]
          }
        ]
      }
      circulationCard: {
        Row: {
          cardId: number
          id: number
          openedPackId: number
        }
        Insert: {
          cardId: number
          id?: number
          openedPackId: number
        }
        Update: {
          cardId?: number
          id?: number
          openedPackId?: number
        }
        Relationships: [
          {
            foreignKeyName: "circulationCard_cardId_fkey"
            columns: ["cardId"]
            referencedRelation: "card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circulationCard_openedPackId_fkey"
            columns: ["openedPackId"]
            referencedRelation: "openedPack"
            referencedColumns: ["id"]
          }
        ]
      }
      openedPack: {
        Row: {
          created_at: string | null
          id: number
          packId: number
          userId: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          packId: number
          userId: string
        }
        Update: {
          created_at?: string | null
          id?: number
          packId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "openedPack_packId_fkey"
            columns: ["packId"]
            referencedRelation: "pack"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "openedPack_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      pack: {
        Row: {
          created_at: string | null
          id: number
          name: string
          setId: number
          stripeProductId: string
          totalCards: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          setId: number
          stripeProductId: string
          totalCards: number
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          setId?: number
          stripeProductId?: string
          totalCards?: number
        }
        Relationships: [
          {
            foreignKeyName: "pack_setId_fkey"
            columns: ["setId"]
            referencedRelation: "set"
            referencedColumns: ["id"]
          }
        ]
      }
      set: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string | null
          gmail: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          gmail: string
          id: string
          name: string
        }
        Update: {
          created_at?: string | null
          gmail?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      weighting: {
        Row: {
          created_at: string | null
          id: number
          rarity: string
          setId: number
          weighting: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          rarity: string
          setId: number
          weighting: number
        }
        Update: {
          created_at?: string | null
          id?: number
          rarity?: string
          setId?: number
          weighting?: number
        }
        Relationships: [
          {
            foreignKeyName: "weighting_setId_fkey"
            columns: ["setId"]
            referencedRelation: "set"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
