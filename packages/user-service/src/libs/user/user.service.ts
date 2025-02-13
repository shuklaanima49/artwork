import { createClient, SupabaseClient, UserMetadata } from '@supabase/supabase-js';

export class UserService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL as string;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY as string;
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  /**
   * Registers a new user using Supabase Auth.
   * Triggers an OTP email for verification.
   */
  async signUp(email: string, user_metadata: UserMetadata, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {  ...user_metadata }
      }
    });
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * Signs in the user using Supabase Auth.
   */
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * Verifies the OTP sent to the user's email.
   */
  async verifyOTP(email: string, token: string) {
    const { data, error } = await this.supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * 
   * @param email 
   * @returns 
   */
  async getUserByEmail(email: string) {
    const { data, error } = await this.supabase.from('users').select('*').eq('email', email);
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * @param email 
   * @returns 
   */
  async resetPassword(email: string) {  
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * 
   * @param email 
   * @param user_metadata 
   * @returns 
   */
  async updateUser(email: string, user_metadata: UserMetadata) {  
    const { data, error } = await this.supabase.auth.updateUser({
      email,
      data: { ...user_metadata }
    });
    if (error) {
      throw error;
    }
    return data;
  }


}
